# Laboratory Activity: 3x3 Matrix Row, Column, and Diagonal Sums

**Student:** Jermain C. Engo  
**Course:** BSIT  
**School:** National University Clark  
**Language:** Java  
**Source file:** `Matrix.java`

## 1. Problem

Create a Java program that accepts nine single-digit numbers from the user and stores them in a 3x3 matrix. Validate that each number is from 0 to 9. Calculate and display the sum of every row, every column, and both diagonals. Ask the user if they want to try again.

## 2. Step-by-step Procedure

1. Import the `Scanner` class to read user input.
2. Create a class named `Matrix` and initialize a `Scanner` object.
3. Use a `do-while` loop so the program can be repeated.
4. Declare a 3x3 integer matrix, arrays for row and column totals, and two variables for diagonal totals.
5. Use nested `for` loops to ask the user to enter the nine matrix values.
6. Validate each value using a `while` loop. Accept only numbers from 0 to 9.
7. Use nested loops to calculate each row sum and column sum.
8. Check `i == j` for the first diagonal and `i + j == 2` for the second diagonal.
9. Display the matrix with its row sums, followed by the column sums and both diagonal sums.
10. Ask whether the user wants to try again, validate the response, and repeat or end the program.

## 3. Complete Java Source Code

```java
import java.util.Scanner;

public class Matrix {
    public static void main(String[] args) {

        Scanner input = new Scanner(System.in);
        String choice;

        do {
            int[][] matrix = new int[3][3];
            int[] rowSum = new int[3];
            int[] colSum = new int[3];

            int diagonal1 = 0;
            int diagonal2 = 0;

            // Input matrix elements
            System.out.println("Enter 9 numbers (0-9):");

            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    System.out.print("Enter number: ");
                    int num = input.nextInt();
                    while (num < 0 || num > 9) {
                        System.out.println("Invalid input! Please enter 0-9.");
                        System.out.print("Enter number again: ");
                        num = input.nextInt();
                    }
                    matrix[i][j] = num;
                }
            }

            // Calculate row, column, and diagonal sums
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {

                    rowSum[i] += matrix[i][j];
                    colSum[j] += matrix[i][j];

                    if (i == j) {
                        diagonal1 += matrix[i][j];
                    }

                    if (i + j == 2) {
                        diagonal2 += matrix[i][j];
                    }
                }
            }

            // Display matrix and row sums
            System.out.println("\nMatrix and Row Sums");
            System.out.println("--------------------------------");

            System.out.printf("%-8s %-8s %-8s %-8s%n",
                    "Col 1", "Col 2", "Col 3", "Row Sum");
            for (int i = 0; i < 3; i++) {
                for (int j = 0; j < 3; j++) {
                    System.out.printf("%-8d", matrix[i][j]);
                }
                System.out.printf("%-8d%n", rowSum[i]);
            }
            // Display column sums
            System.out.println("\nColumn Sums:");
            for (int j = 0; j < 3; j++) {
                System.out.print(colSum[j] + "\t");
            }
            // Display diagonal sums
            System.out.println("\n\nDiagonal Sum 1: " + diagonal1);
            System.out.println("Diagonal Sum 2: " + diagonal2);
            // Ask the user to try again
            System.out.print("\nTry Again [Yes/No]: ");
            choice = input.next();
           // Validate user's choice
            while (!choice.equalsIgnoreCase("Yes") &&
                   !choice.equalsIgnoreCase("No") &&
                   !choice.equalsIgnoreCase("Yes") &&
                   !choice.equalsIgnoreCase("No")) 
            {
                System.out.println("Invalid input! Please choose  (Yes) or  (No). WAG SHUNGA PO SHUNGA SHUNGA");
                System.out.print("Try Again [Yes/No]: ");
                choice = input.next();
            }
        } while (choice.equalsIgnoreCase("Yes") ||
                 choice.equalsIgnoreCase("Yes"));
        System.out.println("\nThank you! The program has ended.");

        input.close();
    }
}
```

## 4. Sample Run

For sample input values 1 through 9, the matrix and calculated totals are:

```text
Matrix and Row Sums
--------------------------------
Col 1   Col 2   Col 3   Row Sum
1       2       3       6
4       5       6       15
7       8       9       24

Column Sums:
12      15      18

Diagonal Sum 1: 15
Diagonal Sum 2: 15
```

The program also asks: `Try Again [Yes/No]:`

## 5. Program Output Screenshot

Insert the actual screenshot captured after running `Matrix.java` here. The sample run above is text for reference and is not a screenshot.

## 6. What I Learned

I learned how to store values in a two-dimensional array and use nested loops to process rows and columns. I also learned how to validate user input and calculate the two diagonal totals of a matrix.
