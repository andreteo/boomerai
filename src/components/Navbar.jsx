import React from "react";
import styles from "./cssfiles/Navbar.module.css";
import Button from "./Button";

const Navbar = () => {
    return (
        <div className={styles.nav}>
            <a href="/main" className={styles.btn}>
                Home
            </a>
            <a href="/dashboard" className={styles.btn}>
                Boomer Customs
            </a>
            {/* <Button btn={styles.btn}>Home</Button> */}
            {/* <Button btn={styles.btn}>Boomer Customs</Button> */}
        </div>
    );
};

export default Navbar;
