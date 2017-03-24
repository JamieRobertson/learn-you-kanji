//
//  QuestionModel.swift
//  LearnYouKanji
//
//  Created by Jamie Robertson on 17/02/17.
//  Copyright © 2017 Jamie Robertson. All rights reserved.
//

import GameKit

struct Question {
    let question:String
    let answers:[String]
    let correctAnswer:Int
}

class QuestionModel {
    var maxQuestions:Int = 5
    let questions:[[String]] = questionData
    
    init(maxQuestions:Int) {
        self.maxQuestions = maxQuestions
    }
    
    func getRandomNumber(maxValue:Int) -> Int {
        return GKRandomSource.sharedRandom().nextInt(upperBound: maxValue)
    }
    
    func shuffle(list:[[String]]) -> [[String]] {
        // fisher-yates shuffle
        return GKRandomSource.sharedRandom().arrayByShufflingObjects(in: list) as! [[String]]
    }
    
    func getWrongAnswer(questionsShuffled: [[String]], index:Int, randomNumber:Int) -> String {
        // Make sure the random number is not correct
        return index != randomNumber ?
            questionsShuffled[randomNumber][1] :
            getWrongAnswer(
                questionsShuffled:questionsShuffled,
                index:index,
                randomNumber: getRandomNumber(maxValue: self.questions.count)
            )
    }
    
    func buildQuestionStructsFromArrays(
            questionArray:[String], answersArray:[[String]], correctAnswersArray:[Int]) -> [Question] {
        var result = [Question]()
        for i in 0..<self.maxQuestions {
            result.append(Question(
                question: questionArray[i],
                answers: answersArray[i],
                correctAnswer: correctAnswersArray[i]
            ))
        }
        return result
    }
    
    func getQuestions() -> [Question] {
        // shuffle questions
        let questionsShuffled:[[String]] = self.shuffle(list: self.questions)
        
        // return a smaller array of questions from the shuffled questions
        let someQuestions:[String] = questionsShuffled[0..<self.maxQuestions].map({
            (value:[String]) -> String in
            return value[0]
        })
        
        let randomNumbers:[Int] = (0..<self.maxQuestions).map({
            (value:Int) -> Int in
            return getRandomNumber(maxValue: 4)
        })
        
        let someAnswers:[[String]] = questionsShuffled[0..<self.maxQuestions].enumerated().map ({
            (index:Int, value:[String]) -> [String] in
            // empty array to hold our return value
            var result = [String]()
            
            // create 2Darray of correct answers
            result.append(value[1])
            
            // add wrong answers
            while result.count < 4 {
                let randomAnswer:String = self.getWrongAnswer(
                    questionsShuffled:questionsShuffled,
                    index:index,
                    randomNumber:self.getRandomNumber(maxValue: self.questions.count)
                )
                result.append(randomAnswer)
            }
            
            // Swap correct answer
            if randomNumbers[index] != 0 {
                // you cannot swap array item with itself
                swap(&result[0], &result[randomNumbers[index]])
            }
            
            return result
        })

        return self.buildQuestionStructsFromArrays(
            questionArray:someQuestions,
            answersArray:someAnswers,
            correctAnswersArray:randomNumbers
        )
    }
};
