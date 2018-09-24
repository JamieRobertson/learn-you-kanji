//
//  QuestionModel.swift
//  LearnYouKanji
//
//  Created by Jamie Robertson on 17/02/17.
//  Copyright © 2017 Jamie Robertson. All rights reserved.
//
//

import Foundation
import GameKit
import CoreData
import React

enum DBError: Error {
    case errorFetchingData
    case noDataFound
}


func getRandomNumber(maxValue:Int, offset:Int = 0) -> Int {
    // GKRandomSource generates randNum between 0 < maxValue
    // GKRandomSource does not include maxValue
    // offset is used to generate randNum between 2 values
    let randNum:Int = GKRandomSource.sharedRandom().nextInt(upperBound: maxValue)
    return randNum + offset
}

class Choice {
    var wrongAnswers = [String]()
    var correctAnswer:String
    let correctAnswerKey:Int = getRandomNumber(maxValue: 4)
    
    lazy var choices:[String] = {
        var arr = [String]()
        arr.insert(self.correctAnswer, at: 0)
        arr += self.wrongAnswers
        // Swap correct answer. You cannot swap array item with itself
        if self.correctAnswerKey != 0 {
            swap(&arr[0], &arr[self.correctAnswerKey])
        }
        return arr
    }()

    init(correctAnswer:String, wrongAnswers:[String]) {
        self.wrongAnswers = wrongAnswers
        self.correctAnswer = correctAnswer
    }
}

@objc(QuestionManager)
class QuestionManager: NSObject {

    func addChoicesToQuestions(_ questions:[Question], maxQuestions:Int, minId:Int, maxId:Int) -> [[String: Any]] {
        return questions[0...maxQuestions].map({
            (q:Question) in

            var wrongAnswers = [String]()

            while wrongAnswers.count < 4 {
                func addWrongAnswer(randNum:Int) {
                    // check that we dont have the same answer
                    if randNum != Int(q.id) {
                        print("randNum : \(randNum)")
                        let newAnswer: String? = questions[randNum].answer
                        wrongAnswers.append(newAnswer!)
                    } else {
                        addWrongAnswer(randNum: getRandomNumber(maxValue: maxId, offset: minId))
                    }
                }
                addWrongAnswer(randNum: getRandomNumber(maxValue: maxId, offset: minId))
            }
            // Choice.choices returns wrong answers + correct answer key
            let c = Choice(correctAnswer: q.answer!, wrongAnswers: wrongAnswers)

            return ["id": Int(q.id), "question": q.question!, "answer": q.answer!, 
                    "correctAnswerKey": c.correctAnswerKey, "choices": c.choices]
        })
    }

    // func oneQuestionFromCourse(questionId:Int, fromCourse:Course) -> Question {

    //     return results
    // }
    
    func allQuestionsFromCourse(_ fromCourse:[Course]) -> [Question] {
        // fromCourse should be array of length 1
        let c = fromCourse.first!

        var results:[Question] = c.questions?.allObjects as! [Question]
        results.sort(by: {$0.id < $1.id})  // sort by id to create rand offset

        return results
    }

    func fetchCoursesFromDB(_ forGrade:Int = 0) -> [Course] {
        var results = [Course]()
        let fetchRequest:NSFetchRequest<Course> = Course.fetchRequest()
        // Did specify a course ?
        if (forGrade > 0) {
            fetchRequest.predicate = NSPredicate(format: "%K == %i", "grade", forGrade)
            fetchRequest.fetchLimit = 1
        }
        // Make the DB lookup
        do {
            results = try DatabaseController.getContext().fetch(fetchRequest)
            if (results.count > 0) {
                results.sort(by: {$0.grade < $1.grade})
            } else {
                throw DBError.noDataFound
            }
        } catch {
            print(error.localizedDescription)
        }
        return results
    }

    @objc(modifyQuestionStrength:isCorrect:callback:)
    func modifyQuestionStrength(questionId:Int, isCorrect:Bool, callback: (RCTResponseSenderBlock) ) -> Void {
        // Increase or decrease strength if question strength is > -1.0 && < 1.0
        func fetchQuestionFromDB(_ questionId:Int) -> Question {
            var result = Question()
            let fetchRequest:NSFetchRequest<Question> = Question.fetchRequest()

            fetchRequest.predicate = NSPredicate(format: "%K == %i", "id", questionId)
            fetchRequest.fetchLimit = 1
            // Make the DB lookup
            do {
                let results = try DatabaseController.getContext().fetch(fetchRequest)
                if (results.count > 0) {
                    result = results[0]
                } else {
                    throw DBError.noDataFound
                }
            } catch {
                print(error.localizedDescription)
            }
            return result
        }
        
        let questionLookup = fetchQuestionFromDB(questionId)
        let currentStrength = questionLookup.value(forKey: "strength") as! Float

        if (currentStrength > -1.0 && currentStrength < 1.0) {
            if (isCorrect) {
                questionLookup.increaseStrength()
            } else {
                questionLookup.decreaseStrength()
            }
            // Save the context
            DatabaseController.saveContext()
        }
        // Return err / success callback
        callback([NSNull(), true])
    }

    @objc(getCourses:)
    func getCourses(callback: (RCTResponseSenderBlock) ) -> Void {
        
        let courses:[Course] = self.fetchCoursesFromDB()

        let resultsDict:[[String:Any]] = courses.map({
            (c:Course) in
            return c.dictionaryWithValues(forKeys: ["name", "grade"])
        })

        callback([NSNull(), resultsDict])
    }
    
    @objc(getQuestions:maxQuestions:withChoices:callback:)
    func getQuestions(forGrade:Int, maxQuestions:Int, withChoices:Bool, callback: (RCTResponseSenderBlock) ) -> Void {
        
        let courses:[Course] = self.fetchCoursesFromDB(forGrade)
        
        let questionsInCourse:[Question] = self.allQuestionsFromCourse(courses)
        let minId:Int = Int(questionsInCourse.first!.id)
        let maxId:Int = questionsInCourse.count  // maxId is 1-based

        let questionsShuffled:[Question] = GKRandomSource.sharedRandom().arrayByShufflingObjects(
           in: questionsInCourse) as! [Question]
        
        // Define results dictionary in outer scope
        var resultsDict = [[String:Any]]()

        if (withChoices == false) {
            // Return just questions and answers
            resultsDict = questionsShuffled.map({
                (q:Question) in
                return q.dictionaryWithValues(forKeys: ["question", "answer", "id"])
            })
        } else {
            // Return questions with choices
            resultsDict = self.addChoicesToQuestions(questionsShuffled, 
                                                     maxQuestions: maxQuestions, 
                                                     minId:minId, 
                                                     maxId:maxId)
        }
        
        callback([NSNull(), resultsDict])
    }
}
