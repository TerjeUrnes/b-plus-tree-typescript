
export interface IKey {

    /**
     * 
     * @param other 
     * @returns negative value (-1) if this is less than other, zero (0) if equal, positive value (1) if this is greater than other.
     */
    CompareTo(other: IKey): number; 
}