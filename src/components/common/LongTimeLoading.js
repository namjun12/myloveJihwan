import React from 'react'
import { useRecoilValue } from 'recoil'
import { PdfProgressAtom } from '../../recoil/PdfDownloadAtom'
import styled from 'styled-components'

const LongTimeLoading = ({ waitingTime }) => {
   const pdfDonwloadValue = useRecoilValue(PdfProgressAtom)

   return (
      <div className='loading-modal-wrap'>
         <div className='content'>
            <i className='xi-spinner-1 xi-spin icon-spin'></i>
            <p className='text'>잠시만 기다려주세요!</p>
            {waitingTime && <p style={{ fontSize: '14px', color: '#9a9a9c' }}>예상 대기 시간: {waitingTime}</p>}
            {pdfDonwloadValue !== 0 && <p style={{ fontSize: '14px', color: '#9a9a9c' }}>{pdfDonwloadValue}%</p>}
         </div>
      </div>
   )
}

export default LongTimeLoading