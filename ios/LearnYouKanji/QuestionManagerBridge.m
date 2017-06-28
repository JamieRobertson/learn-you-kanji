//
//  QuestionManagerBridge.m
//  LearnYouKanji
//
//  Created by Jamie Robertson on 28/06/17.
//  Copyright © 2017 Jamie Robertson. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(QuestionManager, NSObject)

RCT_EXTERN_METHOD(getQuestions:(nonnull NSNumber *)grade
                  maxQuestions:(nonnull NSNumber *)maxQuestions
                  withChoices:(BOOL)withChoices
                  callback: (RCTResponseSenderBlock)callback)

@end
