:- use_module(library(clpfd)).
:- use_module(library(lists)).
:- use_module(library(readutil)).

% Define the directions and their corresponding row and column changes.
direction(n, -1, 0).
direction(s, 1, 0).
direction(w, 0, -1).
direction(e, 0, 1).
direction(nw, -1, -1).
direction(ne, -1, 1).
direction(sw, 1, -1).
direction(se, 1, 1).

% Predicate to read the grid from a file.
read_grid(FileName, Grid) :-
    open(FileName, read, Stream),
    read_line_to_codes(Stream, Line),
    atom_codes(Atom, Line),
    atom_number(Atom, N),
    read_lines(Stream, N, Grid),
    close(Stream).

read_lines(_, 0, []) :- !.
read_lines(Stream, N, [Row|Rows]) :-
    N > 0,
    read_line_to_codes(Stream, Line),
    atom_codes(Atom, Line),
    atomic_list_concat(Atoms, ' ', Atom),
    maplist(atom_number, Atoms, Row),
    N1 #= N - 1,
    read_lines(Stream, N1, Rows).

% Predicate to find the shortest path.
moves(FileName, Moves) :-
    read_grid(FileName, Grid),
    length(Grid, N),
    ( find_path(Grid, 0, 0, N, [], Path) ->
        reverse(Path, Moves)
    ; Moves = 'IMPOSSIBLE' ).

find_path(Grid, Row, Col, N, Path, Moves) :-
    ( Row =:= N-1, Col =:= N-1 ->
        Moves = Path
    ; valid_moves(Grid, Row, Col, N, ValidMoves),
      member((NewRow, NewCol, Dir), ValidMoves),
      \+ member((NewRow, NewCol, _), Path), % Avoid cycles
      find_path(Grid, NewRow, NewCol, N, [(NewRow, NewCol, Dir)|Path], Moves)
    ).

valid_moves(Grid, Row, Col, N, ValidMoves) :-
    nth0(Row, Grid, GridRow),
    nth0(Col, GridRow, CurrentCars),
    findall((NewRow, NewCol, Dir),
            ( direction(Dir, DRow, DCol),
              NewRow #= Row + DRow,
              NewCol #= Col + DCol,
              NewRow #>= 0, NewRow #< N,
              NewCol #>= 0, NewCol #< N,
              nth0(NewRow, Grid, NewGridRow),
              nth0(NewCol, NewGridRow, NewCars),
              NewCars #< CurrentCars
            ),
            ValidMoves).

% Sample run:
% ?- moves('grid1.txt', Moves).
% Moves = [se, s, se, se, e].
