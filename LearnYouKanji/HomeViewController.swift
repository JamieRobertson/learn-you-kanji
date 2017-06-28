//
//  HomeViewController.swift
//  LearnYouKanji
//
//  Created by Jamie Robertson on 21/04/17.
//  Copyright © 2017 Jamie Robertson. All rights reserved.
//

import UIKit
import CoreData
import SnapKit


enum DBError: Error {
    case errorFetchingData
    case noDataFound
}

class HomeViewController: UIViewController {
    var allCourses:[Course]
    lazy var wrapper = UIView()
    
//    let courseItemWrapper:UIView = {
//        let view = UIView()
//    }()

    required init?(coder aDecoder: NSCoder) {
        self.allCourses = HomeViewController.fetchAllCourses()
        super.init(coder: aDecoder)
    }

    static func fetchAllCourses() -> [Course] {
        var results = [Course]()
        let fetchRequest:NSFetchRequest<Course> = Course.fetchRequest()
        
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

    func makeLabel(title:String) -> UILabel {
        let label = UILabel()
        label.text = title
        // btn.addTarget(self, action: <#T##Selector#>, for: .touchUpInside)
        return label
    }
    
    func makeButton(goTo:String) -> UIButton {
        let button = UIButton()
        if (goTo == "practice") {
            button.setTitle("Practice", for: .normal)
        } else if (goTo == "quiz") {
            button.setTitle("Take test", for: .normal)
        }
        button.backgroundColor = UIColor.blue
        // button.setTitleColor(UIColor.black, for: .normal)
        // button.frame = CGRect(x: 60, y: 60, width: 200, height: 60)
        // button.frame(forAlignmentRect: CGRect)
        return button
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        for course in self.allCourses {
            //let courseItem:UIView = makeCourseItem(courseName: course.name)
            //self.view.addSubview(courseItem)
            
            // Create view items. Wraps buttons
            let label = makeLabel(title: course.name!)
            let btnQuiz = makeButton(goTo: "quiz")
            let btnPractice = makeButton(goTo: "practice")
            
            self.wrapper.addSubview(label)
            self.wrapper.addSubview(btnQuiz)
            self.wrapper.addSubview(btnPractice)
            
            self.view.addSubview(self.wrapper)
        }
    }
}
