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
    let questions:[[String]] = [
        ["日", "sun"], ["一", "one"], ["大", "big"], ["年", "year"], ["中", "middle"], ["会", "to meet"], ["人", "human being, people"], ["​本", "book"], ["月", "moon, month"], ["長", "long"], ["国", "country"], ["出", "to go out"], ["上", "up, top"], ["十", "ten"], ["生", "life"], ["子", "child"], ["分", "minute"], ["東", "east"], ["三", "three"], ["行", "to go"], ["同", "same"], ["今", "now"], ["高", "high, expensive"], ["金", "money, gold"], ["時", "time"], ["手", "hand"], ["見", "to see, to look"], ["市", "city"], ["力", "power"], ["米", "rice"], ["自", "oneself"], ["前", "before"], ["円", "Yen (Japanese currency)"], ["合", "to combine"], ["立", "to stand"], ["内", "inside"], ["二", "two"], ["事", "affair, matter"], ["社", "company, society"], ["者", "person"], ["地", "ground, place"], ["京", "capital"], ["間", "interval, between"], ["田", "rice field"], ["体", "body"], ["学", "to study"], ["下", "down, under"], ["目", "eye"], ["五", "five"], ["後", "after"], ["新", "new"], ["明", "bright, clear"], ["方", "direction"], ["部", "section"], ["女", "woman"], ["八", "eight"], ["心", "heart"], ["四", "four"], ["民", "people, nation"], ["対", "opposite"], ["主", "main, master"], ["正", "right, correct"], ["代", "to substitute, generation"], ["言", "to say"], ["九", "nine"], ["小", "small"], ["思", "to think"], ["七", "seven"], ["​山", "mountain"], ["実", "real"], ["入", "to enter"], ["回", "to turn around, time"], ["場", "place"], ["野", "field"], ["開", "to open"], ["万", "ten thousand"], ["全", "whole"], ["定", "to fix"], ["家", "house"], ["北", "north"], ["六", "six"], ["問", "question"], ["話", "to speak"], ["文", "letter, writings"], ["動", "to move"], ["度", "degree, time"], ["県", "prefecture"], ["水", "water"], ["安", "inexpensive, peaceful"], ["氏", "courtesy name (Mr., Mrs.)"], ["和", "harmonious, peace"], ["政", "government, politics"], ["保", "to maintain, to keep"], ["表", "to express, surface"], ["道", "way"], ["相", "phase, mutual"], ["意", "mind, meaning"], ["発", "to start, to emit"], ["不", "not, un~, in~"], ["党", "political party"]
    ]
    
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
