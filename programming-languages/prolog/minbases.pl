% Predicate to find the minimal base for a list of numbers
minbases(Numbers, Bases) :-
    maplist(minimal_base, Numbers, Bases).

% Predicate to find the minimal base for a given number
minimal_base(N, Base) :-
    check_base(N, 2, Base).

check_base(N, B, B) :-
    is_uniform(N, B).

check_base(N, B, Base) :-
    \+ is_uniform(N, B),
    B1 is B + 1,
    check_base(N, B1, Base).

is_uniform(N, Base) :-
    N < Base.

is_uniform(N, Base) :-
    N >= Base,
    Digit is N mod Base,
    Next is N // Base,
    NextDigit is Next mod Base,
    Digit =:= NextDigit,
    is_uniform(Next, Base).