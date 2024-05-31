open Printf
open Scanf

module PriorityQueue = struct
  type 'a t = { mutable heap : 'a array; mutable size : int; cmp : 'a -> 'a -> int }

  let create cmp capacity =
    { heap = Array.make capacity (Obj.magic 0); size = 0; cmp }

  let parent i = (i - 1) / 2
  let left i = 2 * i + 1
  let right i = 2 * i + 2

  let swap pq i j =
    let temp = pq.heap.(i) in
    pq.heap.(i) <- pq.heap.(j);
    pq.heap.(j) <- temp

  let rec heapify_up pq i =
    if i > 0 then
      let p = parent i in
      if pq.cmp pq.heap.(i) pq.heap.(p) < 0 then (
        swap pq i p;
        heapify_up pq p
      )

  let rec heapify_down pq i =
    let l = left i in
    let r = right i in
    let smallest = ref i in
    if l < pq.size && pq.cmp pq.heap.(l) pq.heap.(!smallest) < 0 then
      smallest := l;
    if r < pq.size && pq.cmp pq.heap.(r) pq.heap.(!smallest) < 0 then
      smallest := r;
    if !smallest <> i then (
      swap pq i !smallest;
      heapify_down pq !smallest
    )

  let add pq x =
    if pq.size = Array.length pq.heap then
      pq.heap <- Array.append pq.heap (Array.make pq.size (Obj.magic 0));
    pq.heap.(pq.size) <- x;
    pq.size <- pq.size + 1;
    heapify_up pq (pq.size - 1)

  let pop pq =
    if pq.size = 0 then failwith "PriorityQueue is empty";
    let root = pq.heap.(0) in
    pq.heap.(0) <- pq.heap.(pq.size - 1);
    pq.size <- pq.size - 1;
    heapify_down pq 0;
    root

  let is_empty pq = pq.size = 0
end

type cell = {
  row : int;
  col : int;
  car_count : int;
  path : string list;
}

let directions = [| "N"; "S"; "W"; "E"; "NW"; "NE"; "SW"; "SE" |]
let d_row = [| -1; 1; 0; 0; -1; -1; 1; 1 |]
let d_col = [| 0; 0; -1; 1; -1; 1; -1; 1 |]

let read_grid filename =
  let ic = open_in filename in
  let n = int_of_string (input_line ic) in
  let grid = Array.make_matrix n n 0 in
  for i = 0 to n - 1 do
    let line = input_line ic in
    let values = Str.split (Str.regexp " +") line in
    List.iteri (fun j v -> grid.(i).(j) <- int_of_string v) values
  done;
  close_in ic;
  grid

let is_valid_move row col n grid current_cars =
  row >= 0 && row < n && col >= 0 && col < n && grid.(row).(col) < current_cars

let find_shortest_path grid =
  let n = Array.length grid in
  let visited = Array.make_matrix n n false in
  let compare_cells c1 c2 = compare (List.length c1.path) (List.length c2.path) in
  let pq = PriorityQueue.create compare_cells 10 in
  PriorityQueue.add pq { row = 0; col = 0; car_count = grid.(0).(0); path = [] };
  let rec search () =
    if PriorityQueue.is_empty pq then "IMPOSSIBLE"
    else
      let current = PriorityQueue.pop pq in
      let row, col = current.row, current.col in
      if row = n - 1 && col = n - 1 then
        "[" ^ (String.concat "," (List.rev current.path)) ^ "]"
      else
        let () = if not visited.(row).(col) then visited.(row).(col) <- true in
        for i = 0 to 7 do
          let new_row = row + d_row.(i) in
          let new_col = col + d_col.(i) in
          if is_valid_move new_row new_col n grid grid.(row).(col) && not visited.(new_row).(new_col) then
            let new_path = directions.(i) :: current.path in
            PriorityQueue.add pq { row = new_row; col = new_col; car_count = grid.(new_row).(new_col); path = new_path }
        done;
        search ()
  in
  search ()

let () =
  if Array.length Sys.argv < 2 then
    printf "Please provide the input file as an argument.\n"
  else
    let filename = Sys.argv.(1) in
    let grid = read_grid filename in
    let result = find_shortest_path grid in
    printf "%s\n" result
