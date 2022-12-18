import styles from './styles.module.scss';
import {format}  from 'date-fns';
import {ptBR}  from 'date-fns/locale';


export default function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR,
    });
    return (
        <header className={styles.headerContainer}>
            <img src="/logo.png" alt="Podcastr Logo" width="50px" />
            <h1>Podcastr</h1>

            <p>O melhor apra você ouvir, sempre!</p>

            <span>{currentDate}.</span>
        </header>
    );
};