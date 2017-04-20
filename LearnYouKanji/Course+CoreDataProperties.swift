//
//  Course+CoreDataProperties.swift
//  LearnYouKanji
//
//  Created by Jamie Robertson on 05/04/17.
//  Copyright © 2017 Jamie Robertson. All rights reserved.
//

import Foundation
import CoreData


extension Course {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Course> {
        return NSFetchRequest<Course>(entityName: "Course");
    }

    @NSManaged public var name: String?
    @NSManaged public var grade: Int16
    @NSManaged public var questions: NSSet?

}

// MARK: Generated accessors for questions
extension Course {

    @objc(addQuestionsObject:)
    @NSManaged public func addToQuestions(_ value: Question)

    @objc(removeQuestionsObject:)
    @NSManaged public func removeFromQuestions(_ value: Question)

    @objc(addQuestions:)
    @NSManaged public func addToQuestions(_ values: NSSet)

    @objc(removeQuestions:)
    @NSManaged public func removeFromQuestions(_ values: NSSet)

}
