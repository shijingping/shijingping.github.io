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