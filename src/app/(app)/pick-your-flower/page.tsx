'use client'

import { type ReactNode, useCallback, useMemo, useState } from 'react'

import Footer from '@/components/homepage/footer'
import Navbar from '@/components/homepage/navbar'
import Popup from '@/components/homepage/popup'
import FlowerResult from '@/components/pick-your-flower/subpages/flower-result'
import SelectCard from '@/components/pick-your-flower/subpages/select-card'
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
  const flowerNameList = useMemo(
    () => shuffledCards.map((data) => data.FlowerName),
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
              resultImage={cardList[selectedCard]}
              resultName={flowerNameList[selectedCard]}
            />
          )
        )
      default:
        return <div>404</div>
    }
  }

  return (
    <div>
      <Popup />
      <Navbar />
      {getPage()}
      <Footer />
    </div>
  )
}

export default FlowerPage
