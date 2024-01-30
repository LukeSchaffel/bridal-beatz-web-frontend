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
		rating?: {
			average_rating: number
			total: number
		}

		reviews: Review[]
		locations: Location[]
		images: Image[]
	}

	interface Review {
		rating: number
		content: string
		account_id: number
		review_id: number
		creator_id: number
		creator?: Account
	}

	interface Location {
		location_id: number
		city: string
		state: string
		zip: string
	}

	interface Image {
		image_id: number
		account_id: number
		url: string
		meta: JSON
		image_kit_id: string
		avatar: boolean
		created_at: string
	}
}

export {}
