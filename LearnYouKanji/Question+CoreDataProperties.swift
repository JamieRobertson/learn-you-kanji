//
//  Question+CoreDataProperties.swift
//  LearnYouKanji
//
//  Created by Jamie Robertson on 05/04/17.
//  Copyright © 2017 Jamie Robertson. All rights reserved.
//

import Foundation
import CoreData


extension Question {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Question> {
        return NSFetchRequest<Question>(entityName: "Question");
    }

    @NSManaged public var answer: String?
    @NSManaged public var id: Int16
    @NSManaged public var question: String?
    @NSManaged public var strength: Int16
    @NSManaged public var course: Course?

}

// My custom methods
extension Question {
    public func increaseStrength() { self.strength += 1 }
    public func decreaseStrength() { self.strength -= 1 }

}
