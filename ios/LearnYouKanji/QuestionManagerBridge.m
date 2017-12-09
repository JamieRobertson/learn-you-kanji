//
//  QuestionManagerBridge.m
//  LearnYouKanji
//
//  Created by Jamie Robertson on 28/06/17.
//  Copyright © 2017 Jamie Robertson. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>

@interface RCT_EXTERN_MODULE(QuestionManager, NSObject)

RCT_EXTERN_METHOD(getQuestions: (nonnull NSInteger *)forGrade
                  maxQuestions: (nonnull NSInteger *)maxQuestions
                  withChoices: (BOOL)withChoices
                  callback: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(getCourses: (RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(modifyQuestionStrength: (NSDictionary *)questionResults
                  callback: (RCTResponseSenderBlock)callback)

@end
