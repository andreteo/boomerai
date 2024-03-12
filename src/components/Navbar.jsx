import React from "react";
import styles from "./cssfiles/Navbar.module.css";
import Button from "./Button";

const Navbar = () => {
    return (
        <div className={styles.nav}>
            <Button btn={styles.btn}>Home</Button>
            <Button btn={styles.btn}>Boomer Customs</Button>
        </div>
    );
};

export default Navbar;
