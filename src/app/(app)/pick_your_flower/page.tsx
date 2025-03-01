'use client'

import { type ReactNode, useCallback, useMemo, useState } from 'react'

import Footer from '@/components/homepage/footer'
import Navbar from '@/components/homepage/navbar'
import FlowerResult from '@/components/pick_your_flower/subpages/flower-result'
import SelectCard from '@/components/pick_your_flower/subpages/select-card'
import FlowerDatas from '@/const/flower-data'

const FlowerPage: React.FC = () => {
  const [phase, setPhase] = useState(1)
  const [selectedCard, setSelectedCard] = useState<number | null>(null)

  const shuffledCards = useMemo(() => {
    const shuffled = [...FlowerDatas].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 9)
  }, [])
  const cardList = useMemo(
    () => shuffledCards.map((data) => data.img),
    [shuffledCards]
  )
  const downloadAndShareList = useMemo(
    () => shuffledCards.map((data) => data.downloadShare),
    [shuffledCards]
  )
  const titleList = useMemo(
    () => shuffledCards.map((data) => data.title),
    [shuffledCards]
  )
  const textList = useMemo(
    () => shuffledCards.map((data) => data.content),
    [shuffledCards]
  )

  const handleClick = useCallback(() => {
    const randomCard: number = Math.floor(Math.random() * cardList.length)
    setSelectedCard(randomCard)
    setPhase(2)
  }, [cardList.length])

  const getPage = (): ReactNode => {
    switch (phase) {
      case 1:
        return (
          <SelectCard
            cardList={cardList}
            handleClick={handleClick}
            selectedCard={selectedCard}
          />
        )
      case 2:
        return (
          selectedCard !== null && (
            <FlowerResult
              resultDownloadandShare={downloadAndShareList[selectedCard]}
              resultImage={cardList[selectedCard]}
              resultName={titleList[selectedCard]}
              resultText={textList[selectedCard]}
            />
          )
        )
      default:
        return <div>404</div>
    }
  }

  return (
    <div>
      <Navbar />
      {getPage()}
      <Footer />
    </div>
  )
}

export default FlowerPage
