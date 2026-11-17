# Laboratory Activity: Three-Dimensional Array in Java

**Student:** Jermain C. Engo  
**Course:** BSIT  
**School:** National University Clark  
**Subject:** Fundamentals of Programming  
**Language:** Java  
**File:** `ThreeDim.java`

## 1. Problem

Create a Java program that declares and initializes a three-dimensional integer array. Use nested `for` loops to display the values by layer, row, and column.

## 2. Step-by-step Procedure

1. Create a Java class named `ThreeDim` in the package `com.mycompany.threedim`.
2. Inside the `main` method, declare and initialize a three-dimensional integer array with two layers, two rows per layer, and two values per row.
3. Use the first `for` loop to access each layer of the array.
4. Display the current layer number.
5. Use the second `for` loop to access each row in the selected layer.
6. Use the third `for` loop to access and print each value in the selected row.
7. Print a new line after each row so the output is organized.
8. Run the program and check that all array values are displayed in the correct order.

## 3. Complete Java Source Code

```java
package com.mycompany.threedim;

public class ThreeDim {
    public static void main(String[] args) {
        int threeDim[][][] = {
            {{10, 20}, {30, 40}},
            {{50, 60}, {70, 80}}
        };

        for (int layer = 0; layer < threeDim.length; layer++) {
            System.out.println("Layer " + (layer + 1) + ":");

            for (int row = 0; row < threeDim[layer].length; row++) {
                for (int col = 0; col < threeDim[layer][row].length; col++) {
                    System.out.print(threeDim[layer][row][col] + " ");
                }
                System.out.println();
            }
        }
    }
}
```

## 4. Expected Program Output

```text
Layer 1:
10 20
30 40
Layer 2:
50 60
70 80
```

## 5. Program Output Screenshot

**Submission item:** Insert the actual screenshot captured after running `ThreeDim.java` here. The expected text output above is provided for checking; it is not a screenshot.

## 6. What I Learned

I learned how a three-dimensional array stores data in layers, rows, and columns. I also learned how nested `for` loops can access each value and display the array in an organized format.
