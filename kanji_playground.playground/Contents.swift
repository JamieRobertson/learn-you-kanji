import GameKit

var arr:[[String]] = [
    ["foo", "a", "b", "c", "d"],
    ["foo", "a", "b", "c", "d"],
    ["foo", "a", "b", "c", "d"],
    ["foo", "a", "b", "c", "d"],
    ["foo", "a", "b", "c", "d"],
    ["foo", "a", "b", "c", "d"],
    ["foo", "a", "b", "c", "d"],
    ["foo", "a", "b", "c", "d"],
    ["foo", "a", "b", "c", "d"],
    ["foo", "a", "b", "c", "d"]
]


func randomNumber(maxValue:Int) -> Int {
    return GKRandomSource.sharedRandom().nextInt(upperBound: maxValue)
}


func createCorrectAnswers() -> [Int] {
    var result:[Int] = []
    for i in 0..<arr.count {
        var correctAnswer:Int = randomNumber(maxValue: 4)
        // make answers 1-based
        correctAnswer += 1
        
        // save index of correct answer
        result.append(correctAnswer)
        
        // swap correct answer with random answer
        if arr[i][1] != arr[i][correctAnswer] {
            // you cannot swap array item with itself
            swap(&arr[i][correctAnswer], &arr[i][1])
        }
    }
    return result
}
var correctAnswers:[Int] = createCorrectAnswers()

print(arr)

print(arr[4][correctAnswers[4]])


//let someQuestions:[String] = for i in Array(arr[0..<5]) { return arr[i][0] }

let someQuestions:[String] = arr.map({
    (value:[String]) -> String in
    return value[0]
})

print(someQuestions)