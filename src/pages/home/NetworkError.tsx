import { IonButton, IonIcon } from '@ionic/react'
import { alertCircleSharp } from 'ionicons/icons'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCategories } from '../../slices/categoriesSlice';
import styles from "./Home.module.css";

export const NetworkError: React.FC = () => {
  const categories = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();
  return (
    <div style={{padding: '0 1em', textAlign: 'center'}}>
      <h3 className={styles.titleStyle}>
        {categories.error?.message}
      </h3>
      <IonIcon
        style={{fontSize: '32px', color: 'coral'}}
        icon={alertCircleSharp}
        slot="start"
      />
      <p>It looks like you have a connection issue. Make sure you have it enabled, then click the refresh button below</p>
      <IonButton onClick={() => dispatch(fetchCategories())}>Rafraichir</IonButton>
    </div>
  )
}
