//
//  AppDelegate.swift
//  LearnYouKanji
//
//  Created by Jamie Robertson on 17/02/17.
//  Copyright © 2017 Jamie Robertson. All rights reserved.
//

import Foundation
import UIKit
import CoreData
import React

enum PreloadError: Error {
    case errorPreloadingData
}

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?
    var bridge: RCTBridge!

    func preloadData(){
        print("running preload")
        do {
            if let filePath = Bundle.main.path(forResource: "questionData", ofType: "plist") {

                let items = NSArray(contentsOfFile: filePath) as! [[String:AnyObject]]

                var questionId:Int16 = 0  // index added to each question
                let defaultStrength:Float = 0

                for courseObject in items {
                    let course:Course = NSEntityDescription.insertNewObject(
                        forEntityName: "Course", into: DatabaseController.getContext()
                    ) as! Course

                    course.grade = courseObject["grade"] as! Int16
                    course.name = courseObject["name"] as? String

                    let questionsArray = courseObject["questions"] as! [[String:String]]

                    for questionObject in questionsArray {
                        let question:Question = NSEntityDescription.insertNewObject(
                            forEntityName: "Question", into: DatabaseController.getContext()
                        ) as! Question
                        question.id = questionId; questionId += 1
                        question.strength = defaultStrength
                        question.question = questionObject["question"]
                        question.answer = questionObject["answer"]
                        course.addToQuestions(question)
                    }
                }
                DatabaseController.saveContext()
            } else {
                throw PreloadError.errorPreloadingData
            }
        } catch {
            print(error.localizedDescription)
        }
    }

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

        // Remove status bar in info.plist:
        // "View controller-based status bar appearance" = NO
        // "Status bar is initially hidden" = YES

        // set defaults:
        let defaults = UserDefaults.standard
        let isPreloaded = defaults.bool(forKey: "isPreloaded")

        if !isPreloaded {
            self.preloadData()
            defaults.set(true, forKey: "isPreloaded")
        }

        // start app with React Native:
        let jsCodeLocation = URL(string: "http://localhost:8081/index.ios.bundle?platform=ios")
        
        let rootView = RCTRootView(
            bundleURL: jsCodeLocation,
            moduleName: "LearnYouKanji",
            initialProperties: nil,
            launchOptions: nil
        )
        
        self.bridge = rootView?.bridge
        
        let rootViewController = UIViewController()
        rootViewController.view = rootView
        
        self.window = UIWindow(frame: UIScreen.main.bounds)
        // self.window?.backgroundColor = UIColor.white
        self.window?.rootViewController = rootViewController
        self.window?.makeKeyAndVisible()
        
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

