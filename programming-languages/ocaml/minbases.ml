(* Function to read lines from a file *)
let read_lines filename =
  let ic = open_in filename in
  let rec aux acc =
    match input_line ic with
    | line -> aux (line :: acc)
    | exception End_of_file -> close_in ic; List.rev acc
  in
  aux []

(* Function to find the minimal base for a given number *)
let minimal_base n =
  let rec check_base b =
    let rec is_uniform n base =
      if n < base then true
      else let digit = n mod base in
           let next = n / base in
           if next mod base <> digit then false
           else is_uniform next base
    in
    if is_uniform n b then b
    else check_base (b + 1)
  in
  check_base 2

(* Main function *)
let () =
  let filename = Sys.argv.(1) in
  let lines = read_lines filename in
  let numbers = List.tl lines |> List.map int_of_string in
  let results = List.map minimal_base numbers in
  List.iter (fun base -> Printf.printf "%d\n" base) results
