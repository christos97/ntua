#include <iostream>
#include <fstream>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

// Function to compute the minimum difference
int findMinimumDifference(const vector<int> &arr, int N)
{
    long long totalSum = 0;
    for (int i = 0; i < N; ++i)
    {
        totalSum += arr[i];
    }

    // Target sum is half of total sum
    long long target = totalSum / 2;
    vector<bool> canAchieve(target + 1, false);
    canAchieve[0] = true;

    // Dynamic programming to find closest possible sum to `target`
    for (int num : arr)
    {
        for (int j = target; j >= num; --j)
        {
            if (canAchieve[j - num])
                canAchieve[j] = true;
        }
    }

    // Finding the best possible sum that we can achieve
    long long bestSum = 0;
    for (long long s = target; s >= 0; --s)
    {
        if (canAchieve[s])
        {
            bestSum = s;
            break;
        }
    }

    // Minimum difference
    return abs(totalSum - 2 * bestSum);
}

int main(int argc, char *argv[])
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    if (argc != 2)
    {
        cout << "Usage: " << argv[0] << " <input_file>" << endl;
        return 1;
    }

    ifstream inFile(argv[1]);
    if (!inFile.is_open())
    {
        cout << "Error: Could not open file " << argv[1] << endl;
        return 1;
    }

    int N;
    inFile >> N;
    vector<int> arr(N);
    for (int i = 0; i < N; i++)
    {
        inFile >> arr[i];
    }
    inFile.close();

    // Compute and print the minimum difference
    cout << findMinimumDifference(arr, N) << endl;

    return 0;
}
