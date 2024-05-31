import java.io.*;
import java.util.*;

public class Moves {
    private static final int[] dRow = {-1, 1, 0, 0, -1, -1, 1, 1};
    private static final int[] dCol = {0, 0, -1, 1, -1, 1, -1, 1};
    private static final String[] directions = {"N", "S", "W", "E", "NW", "NE", "SW", "SE"};

    static class Cell {
        int row, col, carCount;
        List<String> path;

        Cell(int row, int col, int carCount, List<String> path) {
            this.row = row;
            this.col = col;
            this.carCount = carCount;
            this.path = new ArrayList<>(path);
        }
    }

    public static void main(String[] args) throws IOException {
        if (args.length < 1) {
            System.out.println("Please provide the input file as an argument.");
            return;
        }
        String filename = args[0];
        int[][] grid = readGrid(filename);
        if (grid == null) {
            System.out.println("Error reading the grid from the file.");
            return;
        }
        String result = findShortestPath(grid);
        System.out.println(result);
    }

    private static int[][] readGrid(String filename) throws IOException {
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            int n = Integer.parseInt(br.readLine().trim());
            int[][] grid = new int[n][n];
            for (int i = 0; i < n; i++) {
                String[] line = br.readLine().trim().split("\\s+");
                for (int j = 0; j < n; j++) {
                    grid[i][j] = Integer.parseInt(line[j]);
                }
            }
            return grid;
        }
    }

    private static String findShortestPath(int[][] grid) {
        int n = grid.length;
        boolean[][] visited = new boolean[n][n];
        PriorityQueue<Cell> pq = new PriorityQueue<>(Comparator.comparingInt(cell -> cell.path.size()));
        pq.offer(new Cell(0, 0, grid[0][0], new ArrayList<>()));

        while (!pq.isEmpty()) {
            Cell current = pq.poll();
            int row = current.row;
            int col = current.col;

            if (row == n - 1 && col == n - 1) {
                return current.path.toString();
            }

            if (visited[row][col]) {
                continue;
            }
            visited[row][col] = true;

            for (int i = 0; i < 8; i++) {
                int newRow = row + dRow[i];
                int newCol = col + dCol[i];

                if (isValidMove(newRow, newCol, n, grid, grid[row][col]) && !visited[newRow][newCol]) {
                    List<String> newPath = new ArrayList<>(current.path);
                    newPath.add(directions[i]);
                    pq.offer(new Cell(newRow, newCol, grid[newRow][newCol], newPath));
                }
            }
        }
        return "IMPOSSIBLE";
    }

    private static boolean isValidMove(int row, int col, int n, int[][] grid, int currentCars) {
        return row >= 0 && row < n && col >= 0 && col < n && grid[row][col] < currentCars;
    }
}
