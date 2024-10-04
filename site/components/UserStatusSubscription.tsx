import { useEffect } from 'react'
import { useSubscription } from '@apollo/client'
import { gql } from '@apollo/client'
import { subscriptionClient } from '@/lib/apolloClient'

const USER_STATUS_UPDATED = gql`
  subscription UserStatusUpdated {
    userStatusUpdated {
      userId
      online
    }
  }
`

interface UserStatusSubscriptionProps {
  onStatusUpdate: (userId: string, online: boolean) => void
}

export function UserStatusSubscription({
  onStatusUpdate,
}: UserStatusSubscriptionProps) {
  const { data, error } = useSubscription(USER_STATUS_UPDATED, {
    client: subscriptionClient, // You'll need to create this client
  })

  useEffect(() => {
    if (data?.userStatusUpdated) {
      const { userId, online } = data.userStatusUpdated
      onStatusUpdate(userId, online)
    }
  }, [data, onStatusUpdate])

  if (error) {
    console.error('Subscription error:', error)
  }

  return null
}
