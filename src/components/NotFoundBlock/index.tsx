import classes from './NotFoundBlock.module.scss';

type NotFoundBlockProps = {
    text: string;
}

export default function NotFoundBlock({ text }: NotFoundBlockProps) {
    return (
        <div className={classes.root}>
            <h1>
                <span>😕</span>
                <br />
                Ничего не найдено
            </h1>
            <p className={classes.description}>{text}</p>
        </div>
    )
};