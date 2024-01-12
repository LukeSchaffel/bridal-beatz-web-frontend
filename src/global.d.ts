declare global {
	interface AuthUser {
		user_id: number
		first_name: string
		last_name: string
		is_admin: boolean
		email: string
		phone?: string | null

		accounts: Account[]
	}

	interface Account {
		account_id: number
		first_name: string
		last_name: string
		is_admin: boolean
		email: string
		phone?: string | null
		type?: 'client' | 'vendor' | 'admin'
		client_type?: 'bride' | 'groom' | 'planner' | 'venue' | null
		vendor_type?: 'band' | 'dj' | 'musician' | null
		genre?: string[]
		bio?: string | null
		about_me?: string | null

		locations: Location[]
	}

	interface Location {
		location_id: number
		city: string
		state: string
		zip: string
	}
}

export {}
