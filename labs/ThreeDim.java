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