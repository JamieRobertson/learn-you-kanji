//
//  ViewController.swift
//  LearnYouKanji
//
//  Created by Jamie Robertson on 17/02/17.
//  Copyright © 2017 Jamie Robertson. All rights reserved.
//

import UIKit
import GameKit


class ViewController: UIViewController {
    
    // buttons
    @IBOutlet weak var flashCard: UILabel!
    @IBOutlet weak var answer1: UIButton!
    @IBOutlet weak var answer2: UIButton!
    @IBOutlet weak var answer3: UIButton!
    @IBOutlet weak var answer4: UIButton!
    @IBOutlet weak var submitAnswerButton: UIButton!

    // buttons as array
    lazy var answerButtons:[UIButton] = { return [self.answer1, self.answer2, self.answer3, self.answer4] }()

    // custom var
    let grade:Int = 1
    let maxQuestions:Int = 9

    // created on view load
    var questions = [Question]()
    var choices = [Choice]()

    // current state properties
    var totalScore:Int = 0
    var currentQuestion:Int = 0
    var hasSubmittedAnswer:Bool = false
    var chosenAnswerIsCorrect:Bool = false
    
    let colors:[String: UIColor] = [
        "green": UIColor(red: 60.0/255, green: 199.0/255, blue: 4.0/255, alpha: 1.0),
        "red": UIColor(red: 255.0/255, green: 137.0/255, blue: 111.0/255, alpha: 1.0),
        "blue": UIColor(red: 0.0/255, green: 170.0/255, blue: 255.0/255, alpha: 1.0),
        "gray": UIColor(red: 167.0/255, green: 167.0/255, blue: 167.0/255, alpha: 1.0),
        "gray-light": UIColor(red: 220.0/255, green: 220.0/255, blue: 220.0/255, alpha: 1.0)
    ]

    func showNextQuestion(q:Int) {
        // reset to some defaults
        self.hasSubmittedAnswer = false
        self.submitAnswerButton.isEnabled = false
        self.submitAnswerButton.isSelected = false

        // add question to label
        flashCard.text = self.questions[q].question
        // add answers to buttons
        for (i, btn) in self.answerButtons.enumerated() {
            btn.isSelected = false
            btn.setTitle(self.choices[q].choices[i], for: .normal)
        }
    }
    
    @IBAction func didChooseAnswer(_ sender: UIButton) {
        // is it the correct answer?
        let btnIndex:Int = self.answerButtons.index(of: sender)!
        let correctAnswerKey:Int = self.choices[self.currentQuestion].correctAnswerKey
        if btnIndex == correctAnswerKey {
            self.chosenAnswerIsCorrect = true
        } else {
            self.chosenAnswerIsCorrect = false
        }
        // enable submit button
        self.submitAnswerButton.isEnabled = true
        // deselect all other buttons...
        for btn in answerButtons {
            btn.isSelected = false
        }
        // ...except for this one
        sender.isSelected = !sender.isSelected
    }
    
    @IBAction func didSubmitAnswer(_ sender: UIButton) {
        // if an answer is selected:
        // grade the answer then show 'next question' title
        if self.hasSubmittedAnswer {
            // go to next question
            if self.currentQuestion < self.maxQuestions  {
                self.currentQuestion += 1
                self.showNextQuestion(q:self.currentQuestion)
            }
        } else {
            // user is submitting answer
            // check if correct
            if self.chosenAnswerIsCorrect {
                self.totalScore += 1
                self.questions[self.currentQuestion].increaseStrength()
            } else {
                self.questions[self.currentQuestion].decreaseStrength()
            }
            self.hasSubmittedAnswer = true
            // change button text
            self.submitAnswerButton.isSelected = true
            print(self.totalScore)
        }
    }

    // this is a hack to set background color for state
    func imageFromColor(colour: UIColor) -> UIImage {
        let rect = CGRect(x:0, y:0, width:1, height:1)
        UIGraphicsBeginImageContext(rect.size)
        let context = UIGraphicsGetCurrentContext()
        context!.setFillColor(colour.cgColor)
        context!.fill(rect)
        let image = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        return image!
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // some defaults - mostly setting colors for states
        self.submitAnswerButton.setTitle("Check answer", for: .normal)
        self.submitAnswerButton.setTitleColor(UIColor.white, for: .normal)
        self.submitAnswerButton.setBackgroundImage(
            self.imageFromColor(colour: self.colors["green"]!), for: .normal
        )
        self.submitAnswerButton.setTitleColor(self.colors["gray"], for: .disabled)
        self.submitAnswerButton.setBackgroundImage(
            self.imageFromColor(colour: self.colors["gray-light"]!), for: .disabled
        )
        // we use selected state for next question button
        self.submitAnswerButton.tintColor = UIColor.clear
        self.submitAnswerButton.setTitle("Next question", for: .selected)
        self.submitAnswerButton.setBackgroundImage(
            self.imageFromColor(colour: self.colors["green"]!), for: .selected
        )
        
        // start app
        let questionsTuple = QuestionManager(maxQuestions: self.maxQuestions, grade: self.grade).getQuestions()
        self.questions = questionsTuple.map({ (t) in t.0 })
        self.choices = questionsTuple.map({ (t) in t.1 })

        //return (t.0 as! Question, t.1 as! Choice)
        self.showNextQuestion(q:self.currentQuestion)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
};
