//
//  AppDelegate.swift
//  LearnYouKanji
//
//  Created by Jamie Robertson on 17/02/17.
//  Copyright © 2017 Jamie Robertson. All rights reserved.
//

import UIKit
import CoreData
import SwiftyJSON


@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?


    func preloadData(){
        print("running preload")
        do {
            if let file = Bundle.main.url(forResource: "questionData", withExtension: "json") {
                
                // Use SwiftyJSON to serialize json data
                let data = try Data(contentsOf: file)
                let json = JSON(data: data)
                var questionId:Int16 = 0  // index added to each question
                
                for (_, courseObject):(String, JSON) in json {
                    let course:Course = NSEntityDescription.insertNewObject(
                        forEntityName: "Course", into: DatabaseController.getContext()
                    ) as! Course
                    course.name = courseObject["name"].stringValue
                    course.grade = courseObject["grade"].number as! Int16
                    
                    let questionsArray = courseObject["questions"].arrayValue
                    for questionObject:JSON in questionsArray {
                        let question:Question = NSEntityDescription.insertNewObject(
                            forEntityName: "Question", into: DatabaseController.getContext()
                        ) as! Question
                        question.id = questionId; questionId += 1
                        question.question = questionObject["question"].stringValue
                        question.answer = questionObject["answer"].stringValue
                        course.addToQuestions(question)
                    }
                }
                DatabaseController.saveContext()

            } else {
                print("no file found")
            }
        } catch {
            print(error.localizedDescription)
        }
    }

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        let defaults = UserDefaults.standard
        let isPreloaded = defaults.bool(forKey: "isPreloaded")

        if !isPreloaded {
            self.preloadData()
            defaults.set(true, forKey: "isPreloaded")
        }
        return true
    }

    func applicationWillResignActive(_ application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
        DatabaseController.saveContext()
    }

}

