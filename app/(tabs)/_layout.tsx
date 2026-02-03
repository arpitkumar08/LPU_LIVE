import { Tabs } from 'expo-router'
import React from 'react'

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name='UniGrp' />
      <Tabs.Screen name='Setting' />
    </Tabs>
  )
}

export default TabsLayout