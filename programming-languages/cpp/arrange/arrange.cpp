#include <iostream>
#include <fstream>
#include <vector>
#include <sstream>

using namespace std;

struct TreeNode
{
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void tokenize(const string &str, const char delim, vector<int> &out)
{
    stringstream ss(str);
    string s;
    while (getline(ss, s, delim))
    {
        if (!s.empty() && s != "0")
        {
            out.push_back(stoi(s));
        }
    }
}

TreeNode *constructTree(vector<int> &nodes, int &index)
{
    if (index >= static_cast<int>(nodes.size()) || nodes[index] == 0)
    {
        index++;
        return nullptr;
    }
    TreeNode *node = new TreeNode(nodes[index]);
    index++;
    node->left = constructTree(nodes, index);
    node->right = constructTree(nodes, index);
    return node;
}

void inorder(TreeNode *node, vector<int> &result)
{
    if (!node)
        return;

    vector<int> left, right;
    inorder(node->left, left);
    inorder(node->right, right);

    // Compare the two potential sequences
    vector<int> normal(left);
    normal.push_back(node->val);
    normal.insert(normal.end(), right.begin(), right.end());

    vector<int> swapped(right);
    swapped.push_back(node->val);
    swapped.insert(swapped.end(), left.begin(), left.end());

    if (lexicographical_compare(swapped.begin(), swapped.end(), normal.begin(), normal.end()))
    {
        swap(node->left, node->right); // Perform the actual swap
        result.insert(result.end(), swapped.begin(), swapped.end());
    }
    else
    {
        result.insert(result.end(), normal.begin(), normal.end());
    }
}

int main(int argc, char *argv[])
{
    if (argc != 2)
    {
        cerr << "Usage: " << argv[0] << " <filename>" << endl;
        return 1;
    }

    ifstream file(argv[1]);
    if (!file.is_open())
    {
        cerr << "Error opening file" << endl;
        return 1;
    }

    string line;
    getline(file, line); // Read and discard the number of nodes

    getline(file, line);
    vector<int> node_values;
    tokenize(line, ' ', node_values);

    int index = 0;
    TreeNode *root = constructTree(node_values, index);

    vector<int> result;
    inorder(root, result);

    for (int num : result)
    {
        cout << num << " ";
    }
    cout << endl;

    file.close();
    return 0;
}
