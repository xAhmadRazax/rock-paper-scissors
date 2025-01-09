FUNCTION getComputerChoice()
    SET randomComputerChoice := generate a random number between 0 and 2 (inclusive)

    <!-- IF randomComputerChoice >= 0 AND randomComputerChoice <= 3 THEN -->
    IF randomComputerChoice = 0 THEN
        RETURN "rock"
    <!-- ELSE IF randomComputerChoice > 3 AND randomComputerChoice <=7 THEN -->
    ELSE IF randomComputerChoice = 1 THEN
        RETURN "paper"
    ELSE
       RETURN "scissors"
    END IF

END FUNCTION


FUNCTION getHumanChoice()
    SET humanChoice := get input from user, 1 to 3 (inclusive).
    1 for rock.
    2 for paper.
    3 for scissors.
    
    WHILE humanChoice < 1 OR humanChoice > 3 DO
        PRINT "Invalid input. please select:
        1 for rock.
        2 for paper.
        3 for scissors."
        SET humanChoice := get input from user, 1 to 3 (inclusive).
        1 for rock.
        2 for paper.
        3 for scissors.
    END WHILE

    IF humanChoice = 1 THEN
        RETURN "rock"
    ELSE IF humanChoice = 2 THEN
        RETURN "paper"
    ELSE 
        RETURN "scissors"
    END IF

END FUNCTION 


FUNCTION PlayRound(computerSelection, humanSelection)
    IF computerSelection = userSelection THEN
        PRINT "ITS A TIE: You picked", userSelection, ",Computer picked", computerSelection
    ELSE IF (userSelection = "rock" AND computerSelection = "scissors") 
            OR (userSelection = "paper" AND computerSelection = "rock")
            OR (userSelection = "scissors" AND computerSelection = "paper") THEN
        PRINT "You Win, you picked: ", userSelection, ", and computer picked: ",computerSelection 
    ELSE 
        PRINT "You LOSE, you picked: ", userSelection, ", and computer picked: ",computerSelection 

    END IF    
END FUNCTION



START
    SET humanScore := 0
    SET computerScore :=0
    Set round := 1

    WHILE round <= 5 DO
        SET humanSelection := getHumanChoice()
        SET computerSelection := getComputerChoice()

        playRound(computerSelection, humanSelection)

        INCREMENT round
    
    END WHILE
END