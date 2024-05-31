import sys
from collections import deque

dRow = [-1, 1, 0, 0, -1, -1, 1, 1]
dCol = [0, 0, -1, 1, -1, 1, -1, 1]
directions = ["N", "S", "W", "E", "NW", "NE", "SW", "SE"]

class Cell:
    def __init__(self, row, col, path):
        self.row = row
        self.col = col
        self.path = list(path)

def read_grid(filename):
    try:
        with open(filename, 'r') as f:
            n = int(f.readline().strip())
            grid = []
            for _ in range(n):
                line = list(map(int, f.readline().strip().split()))
                grid.append(line)
            return grid
    except Exception as e:
        print(f"Error reading the grid from the file: {e}")
        return None

def is_valid_move(row, col, n, grid, current_cars):
    return 0 <= row < n and 0 <= col < n and grid[row][col] < current_cars

def find_shortest_path(grid):
    n = len(grid)
    visited = [[False for _ in range(n)] for _ in range(n)]
    queue = deque([Cell(0, 0, [])])

    while queue:
        current = queue.popleft()
        row, col = current.row, current.col

        if row == n - 1 and col == n - 1:
            return current.path

        if visited[row][col]:
            continue
        visited[row][col] = True

        for i in range(8):
            new_row = row + dRow[i]
            new_col = col + dCol[i]

            if is_valid_move(new_row, new_col, n, grid, grid[row][col]) and not visited[new_row][new_col]:
                new_path = list(current.path)
                new_path.append(directions[i])
                queue.append(Cell(new_row, new_col, new_path))

    return ["IMPOSSIBLE"]

def main():
    if len(sys.argv) < 2:
        print("Please provide the input file as an argument.")
        return
    filename = sys.argv[1]
    grid = read_grid(filename)
    if grid is None:
        print("Error reading the grid from the file.")
        return
    result = find_shortest_path(grid)
    if result == ["IMPOSSIBLE"]:
        print("IMPOSSIBLE")
    else:
        print(f"[{','.join(result)}]")

if __name__ == "__main__":
    main()
