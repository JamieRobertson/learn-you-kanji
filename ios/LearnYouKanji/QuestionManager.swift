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
        // Specify a course ?
        if (forGrade > 0) {
            fetchRequest.predicate = NSPredicate(format: "%K == %i", "grade", forGrade)
            fetchRequest.fetchLimit = 1
            print("fetching pred")
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
    func getQuestions(forGrade:NSInteger, maxQuestions:Int, withChoices:Bool, callback: (RCTResponseSenderBlock) ) -> Void {
        
        let courses:[Course] = self.fetchCoursesFromDB(forGrade)
        
        let questionsInCourse = self.allQuestionsFromCourse(courses)
        
        var resultsDict = [[String:Any]]()
        if (withChoices == false) {
            // Return just questions and answers
            resultsDict = questionsInCourse.map({
                (q:Question) in
                return q.dictionaryWithValues(forKeys: ["answer", "question"])
            })
        } else {
            // Return
        }
        
        let minId:Int = Int(questionsInCourse.first!.id)
        let maxId:Int = questionsInCourse.count  // maxId is 1-based
        
        

//            ["id": 2, "question": "B", "choice": [
//                "correctAnswer": "b", "correctAnswerKey": 3, "wrongAnswers": [
//                    "d", "hello I am a long string", "I too am a string", "b"
//                ]

        
        callback([NSNull(), resultsDict])
    }
}

//class QuestionManager {
//    var maxQuestions:Int
//    var grade:Int
//    
//    init(maxQuestions:Int, grade:Int) {
//        self.maxQuestions = maxQuestions
//        self.grade = grade
//    }
//    
//    func fetchQuestionsForGrade(g:Int) -> [Question] {
//        // Fetch Course from CoreData
//        let fetchRequest:NSFetchRequest<Course> = Course.fetchRequest()
//        fetchRequest.predicate = NSPredicate(format: "%K == %i", "grade", g)
//        fetchRequest.fetchLimit = 1
//        
//        var questionsInCourse = [Question]()  // init in outer scope
//        do {
//            let results:[Course] = try DatabaseController.getContext().fetch(fetchRequest)
//            // Fetch related questions if course exists
//            if (results.count > 0) {
//                let firstResult = results.first!
//                questionsInCourse = firstResult.questions?.allObjects as! [Question]
//                questionsInCourse.sort(by: {$0.id < $1.id})  // sort by id to create rand offset
//            } else {
//                print("No courses for that grade found")
//            }
//        } catch {
//            print(error.localizedDescription)
//        }
//        return questionsInCourse
//    }
//
//    func getQuestions() -> [(Question, Choice)] {
//        let questions = fetchQuestionsForGrade(g: self.grade)
//        let minId:Int = Int(questions.first!.id)
//        let maxId:Int = questions.count  // maxId is 1-based
//
//        let questionsShuffled:[Question] = GKRandomSource.sharedRandom().arrayByShufflingObjects(
//            in: questions) as! [Question]
//        
//        // Return array of tuples: 
//        // Value 1 is Question instance. Value 2 is Choice instance
//        return questionsShuffled[0...self.maxQuestions].map({
//            (q:Question) in
//            
//            var wrongAnswers = [String]()
//            
//            while wrongAnswers.count < 4 {
//                func addWrongAnswer(randNum:Int) {
//                    // check that we dont have the same answer
//                    if randNum != Int(q.id) {
//                        wrongAnswers.append(questionsShuffled[randNum].answer!)
//                    } else {
//                        addWrongAnswer(randNum: getRandomNumber(maxValue: maxId, offset: minId))
//                    }
//                }
//                addWrongAnswer(randNum: getRandomNumber(maxValue: maxId, offset: minId))
//            }
//            
//            let c = Choice(correctAnswer: q.answer!, wrongAnswers: wrongAnswers)
//            return (q, c)
//        })
//    }
//}
