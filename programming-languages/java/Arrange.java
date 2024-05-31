import java.io.*;
import java.util.*;

class Node {
    int value;
    Node left;
    Node right;

    Node(int value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

public class Arrange {
    static int index = 0;

    public static void main(String[] args) {
        if (args.length < 1) {
            System.out.println("Usage: java Arrange <input_file>");
            return;
        }

        String filename = args[0];
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            // Skip the first line containing the number of nodes
            reader.readLine().trim();
            String treeStructure = reader.readLine().trim();

            index = 0;
            Node root = constructTree(treeStructure);
            minimizeLexicographicalOrder(root);
            List<Integer> result = new ArrayList<>();
            inOrderTraversal(root, result);

            for (int value : result) {
                System.out.print(value + " ");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private static Node constructTree(String treeStructure) {
        if (index >= treeStructure.length() || treeStructure.charAt(index) == '0') {
            index++;
            return null;
        }

        Queue<Node> queue = new LinkedList<>();
        Node root = null;
        Node current = null;

        while (index < treeStructure.length()) {
            if (treeStructure.charAt(index) == '0') {
                index++;
                if (!queue.isEmpty()) {
                    current = queue.poll();
                }
            } else {
                int value = 0;
                while (index < treeStructure.length() && Character.isDigit(treeStructure.charAt(index))) {
                    value = value * 10 + (treeStructure.charAt(index) - '0');
                    index++;
                }
                Node node = new Node(value);
                if (root == null) {
                    root = node;
                } else if (current.left == null) {
                    current.left = node;
                } else {
                    current.right = node;
                }
                queue.offer(node);
                current = node;
            }
        }
        return root;
    }

    private static void minimizeLexicographicalOrder(Node node) {
        if (node == null) {
            return;
        }

        Queue<Node> queue = new LinkedList<>();
        queue.offer(node);

        while (!queue.isEmpty()) {
            Node current = queue.poll();

            if (current.left != null && current.right != null && current.left.value > current.right.value) {
                Node temp = current.left;
                current.left = current.right;
                current.right = temp;
            }

            if (current.left != null) {
                queue.offer(current.left);
            }

            if (current.right != null) {
                queue.offer(current.right);
            }
        }
    }

    private static void inOrderTraversal(Node node, List<Integer> result) {
        Stack<Node> stack = new Stack<>();
        Node current = node;

        while (current != null || !stack.isEmpty()) {
            while (current != null) {
                stack.push(current);
                current = current.left;
            }

            current = stack.pop();
            result.add(current.value);
            current = current.right;
        }
    }
}
