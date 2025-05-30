"use client"

import { useState, useEffect, useCallback } from "react"
import type { Website } from "@/config/websites"

export interface HistoryEntry extends Website {
  timestamp: number
}

const HISTORY_STORAGE_KEY = "navigationHistory"
const MAX_HISTORY_ITEMS = 50 // Limit the number of history items

export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([])

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY)
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory))
      }
    } catch (error) {
      console.error("Failed to load history from localStorage:", error)
      setHistory([])
    }
  }, [])

  const saveHistory = useCallback((newHistory: HistoryEntry[]) => {
    try {
      // Sort by timestamp descending and limit the number of items
      const sortedAndLimitedHistory = newHistory.sort((a, b) => b.timestamp - a.timestamp).slice(0, MAX_HISTORY_ITEMS)

      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(sortedAndLimitedHistory))
      setHistory(sortedAndLimitedHistory)
    } catch (error) {
      console.error("Failed to save history to localStorage:", error)
    }
  }, [])

  const addHistoryItem = useCallback(
    (item: Omit<HistoryEntry, "timestamp"> & { timestamp?: number }) => {
      const newItem: HistoryEntry = {
        ...item,
        timestamp: item.timestamp || Date.now(),
      }

      setHistory((prevHistory) => {
        // Remove existing entry for the same URL to avoid duplicates and update its timestamp
        const filteredHistory = prevHistory.filter((entry) => entry.url !== newItem.url)
        const updatedHistory = [newItem, ...filteredHistory]
        saveHistory(updatedHistory) // saveHistory will sort and limit
        return updatedHistory.sort((a, b) => b.timestamp - a.timestamp).slice(0, MAX_HISTORY_ITEMS) // also update state immediately
      })
    },
    [saveHistory],
  )

  const clearHistory = useCallback(() => {
    saveHistory([])
  }, [saveHistory])

  return { history, addHistoryItem, clearHistory }
}
