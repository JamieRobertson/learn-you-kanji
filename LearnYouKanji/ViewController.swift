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
    
    @IBOutlet weak var flashCard: UILabel!
    @IBOutlet weak var answer1: UIButton!
    @IBOutlet weak var answer2: UIButton!
    @IBOutlet weak var answer3: UIButton!
    @IBOutlet weak var answer4: UIButton!
    
    lazy var answerButtons:[UIButton] = { return [self.answer1, self.answer2, self.answer3, self.answer4] }()
    
    var questions = [Question]()  // init as property of class
    let maxQuestions:Int = 10
    var totalScore:Int = 0
    var currentQuestion:Int = 0
    
    let colors:[String: UIColor] = [
        "green": UIColor(red: 151.0/255, green: 255.0/255, blue: 128.0/255, alpha: 1.0),
        "red": UIColor(red: 255.0/255, green: 137.0/255, blue: 111.0/255, alpha: 1.0),
    ]


    func gradeAnswer(sender:UIButton) {
        let btnIndex:Int = self.answerButtons.index(of: sender)!
        let correctAnswer:Int = self.questions[self.currentQuestion].correctAnswer
        if btnIndex == correctAnswer {
            self.totalScore += 1
            sender.backgroundColor = self.colors["green"]
        } else {
            sender.backgroundColor = self.colors["red"]
        }
        print(self.totalScore)
    }
    
    func showNextQuestion(q:Int) {
        // add question to label
        flashCard.text = self.questions[q].question
        // add answers to buttons
        for (i, btn) in self.answerButtons.enumerated() {
            btn.backgroundColor = UIColor.white
            btn.setTitle(self.questions[q].answers[i], for: .normal)
        }
    }
    
    @IBAction func didChooseAnswer(_ sender: UIButton) {
        // was the question correct?
        gradeAnswer(sender:sender)
        // make maxQuestions 0 based here
        if self.currentQuestion < self.maxQuestions-1  {
            self.currentQuestion += 1
            self.showNextQuestion(q:self.currentQuestion)
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let questionModel = QuestionModel(maxQuestions:self.maxQuestions)
        self.questions = questionModel.getQuestions()
        self.showNextQuestion(q:self.currentQuestion)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
};
