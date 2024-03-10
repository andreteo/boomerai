import React from "react";
import styles from "./cssfiles/Navbar.module.css";
import Button from "./Button";

const Navbar = () => {
    return (
        <div className={styles.nav}>
            <Button>Home</Button>
            <Button>Boomer Customs</Button>
        </div>
    );
};

export default Navbar;
