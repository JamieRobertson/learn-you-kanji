import UIKit
import GameKit

var a:[[String]] = [
    ["aaa", "A"], ["bbb", "B"], ["ccc", "C"], ["ddd", "D"],
    ["eee", "E"], ["fff", "F"], ["ggg", "G"], ["hhh", "H"],
    ["iii", "I"], ["jjj", "J"], ["kkk", "K"], ["lll", "L"],
    ["mmm", "M"], ["nnn", "N"], ["ooo", "O"], ["ppp", "P"]
]

func shuffle(list:[[String]]) -> [[String]] {
    return GKRandomSource.sharedRandom().arrayByShufflingObjects(in: list) as! [[String]]
}

func getRandomNumber(maxValue:Int) -> Int {
    return GKRandomSource.sharedRandom().nextInt(upperBound: maxValue)
}

let someQuestions:[String] = a[0..<5].map ({
    (value:[String]) -> String in
    return value[0]
})

func getWrongAnswer(index:Int, randomNumber:Int) -> String {
    // Is the random answer incorrect
    return index != randomNumber ?
        a[randomNumber][1] : getWrongAnswer(index:index, randomNumber: getRandomNumber(maxValue: a.count))
}

let randomNumbers:[Int] = (0..<5).map({
    (value:Int) -> Int in
    return getRandomNumber(maxValue: 4)
})

let someAnswers:[[String]] = a[0..<5].enumerated().map ({
    (index:Int, value:[String]) -> [String] in
    // empty array to hold our return value
    var result = [String]()
    
    // create 2Darray of correct answers
    result.append(value[1])
    
    // add wrong answers
    while result.count < 4 {
        var randomAnswer:String = getWrongAnswer(index:index, randomNumber:getRandomNumber(maxValue: a.count))
        result.append(randomAnswer)
    }
    print(result)
    
    // Swap correct answer
    if randomNumbers[index] != 0 {
        // you cannot swap array item with itself
        swap(&result[0], &result[randomNumbers[index]])
    }
    
    return result
})

print(someAnswers)

print(randomNumbers)

