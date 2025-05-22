import { makeAutoObservable } from 'mobx';

interface UserInfo {
    token?: string;
    status?: string;
    firstName?: string;
    lastName?: string;
}

export default class UserStore {
    token?: string = undefined;
    status?: string = undefined;
    firstName?: string = undefined;
    lastName?: string = undefined;

    constructor() {
        makeAutoObservable(this);
        
        // Load user info from localStorage on initialization
        this.loadUserFromStorage();
    }
    
    setUser(user: UserInfo) {
        this.token = user.token;
        this.status = user.status;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        
        // Store user info in localStorage for persistence
        localStorage.setItem('userInfo', JSON.stringify(user));
    }
    
    clearUser() {
        this.token = undefined;
        this.status = undefined;
        this.firstName = undefined;
        this.lastName = undefined;
        
        // Remove user info from localStorage
        localStorage.removeItem('userInfo');
    }
    
    get fullName() {
        return this.firstName && this.lastName 
            ? `${this.firstName} ${this.lastName}`
            : '';
    }
    
    get isActive() {
        return this.status === 'active';
    }
    
    private loadUserFromStorage() {
        const userInfo = localStorage.getItem('userInfo');
        
        if (userInfo) {
            try {
                const parsedInfo = JSON.parse(userInfo) as UserInfo;
                this.token = parsedInfo.token;
                this.status = parsedInfo.status;
                this.firstName = parsedInfo.firstName;
                this.lastName = parsedInfo.lastName;
            } catch (error) {
                console.error('Error parsing user info from storage:', error);
                localStorage.removeItem('userInfo');
            }
        }
    }
}