import sys

def find_minimum_difference(arr):
    total_sum = sum(arr)
    target = total_sum // 2
    can_achieve = [False] * (target + 1)
    can_achieve[0] = True

    for num in arr:
        for j in range(target, num - 1, -1):
            if can_achieve[j - num]:
                can_achieve[j] = True

    best_sum = 0
    for s in range(target, -1, -1):
        if can_achieve[s]:
            best_sum = s
            break

    return abs(total_sum - 2 * best_sum)

def main():
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <input_file>")
        return

    input_file = sys.argv[1]
    try:
        with open(input_file, 'r') as f:
            N = int(f.readline().strip())
            arr = list(map(int, f.readline().strip().split()))
    except IOError:
        print(f"Error: Could not open file {input_file}")
        return

    print(find_minimum_difference(arr))

if __name__ == "__main__":
    main()
