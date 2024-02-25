import '../styles/main.css';

interface REPLHistoryProps{
    history: string[]
}
export function REPLHistory(props : REPLHistoryProps) {
    return (
        <div className="repl-history">
            {props.history.map((command, index) => (
                <p> {command} </p>
            ))}
            {/* This is where command history will go */}
            {/* TODO: To go through all the pushed commands... try the .map() function! */}
        </div>
    );
}