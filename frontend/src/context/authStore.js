import { create } from "zustand";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/user`;

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
	user: null,
	isAuthenticated: false,
	error: null,
	isLoading: false,
	isCheckingAuth: true,
	message: null,

	signup: async (email, password, name) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/register`, { name, email, password });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
		} catch (error) {
			set({ error: error.response.data.message || "Error signing up", isLoading: false });
			throw error;
		}
	},
	login: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/login`, { email, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			throw error;
		}
	},

	logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await axios.post(`${API_URL}/logout`);
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			throw error;
		}
	},
	verifyEmail: async (code) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/verify-email`, { code });
			set({ user: response.data.user, isAuthenticated: true, isLoading: false });
			return response.data;
		} catch (error) {
			set({ error: error.response.data.message || "Error verifying email", isLoading: false });
			throw error;
		}
	},
	checkAuth: async () => {
		set({ isCheckingAuth: true, error: null });
		try {
			const response = await axios.get(`${API_URL}/check-auth`);
			set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false, error: null });
		} catch (error) {
			set({ user: null, error: null, isCheckingAuth: false, isAuthenticated: false });
		}
	},
	forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/forgot-password`, { email });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},
	resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},
	resendVerificationEmail: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/resend-verification`, { email });
			set({ message: response.data.message, isLoading: false });
			return response.data;
		} catch (error) {
			set({
				error: error.response?.data?.message || "Error resending email",
				isLoading: false
			});
			throw error;
		}
	},
	updateProfile: async (name) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.put(`${API_URL}/edit-profile`, { name });
			set({
				user: response.data.user,
				isLoading: false,
				error: null,
				message: response.data.message,
			});
			return response.data;
		} catch (error) {
			set({
				isLoading: false,
				error: error.response?.data?.message || "Error updating profile",
			});
			throw error;
		}
	},
	changePassword: async (currentPassword, newPassword, confirmPassword) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.put(`${API_URL}/change-password`, {
				currentPassword,
				newPassword,
				confirmPassword,
			});
			set({
				isLoading: false,
				error: null,
				message: response.data.message,
			});
			return response.data;
		} catch (error) {
			set({
				isLoading: false,
				error: error.response?.data?.message || "Error changing password",
			});
			throw error;
		}
	},
	setPassword: async (password, confirmPassword) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.put(`${API_URL}/set-password`, {
				password,
				confirmPassword,
			});

			set((state) => ({
				isLoading: false,
				error: null,
				message: response.data.message,
				user: response.data.user || state.user,
			}));

			return response.data;
		} catch (error) {
			set({
				isLoading: false,
				error: error.response?.data?.message || "Error setting password",
			});
			throw error;
		}
	},
	deleteAccount: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axios.delete(
				`${API_URL}/delete-account`,
				{ withCredentials: true }
			);

			set({
				user: null,
				isAuthenticated: false,
				isLoading: false,
				error: null,
			});

			return response.data;
		} catch (error) {
			set({
				isLoading: false,
				error: error.response?.data?.message || "Error deleting account",
			});
			throw error;
		}
	},
}));