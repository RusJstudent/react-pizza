import { ReactElement } from 'react';
import classes from './NotFoundBlock.module.scss';

type NotFoundBlockProps = {
    content: ReactElement;
}

export default function NotFoundBlock({ content }: NotFoundBlockProps) {
    return (
        <div className={classes.root}>
            <h1>
                <span>😕</span>
                <br />
                Ничего не найдено
            </h1>
            <p className={classes.description}>{content}</p>
        </div>
    )
};