export type TTreeListType =
  '001' | '019001' | '019004' | '004' | '005' | '006' | '007' | '008' | '011' | '019002' | '019003' | '019005' | '018001' | '018002' | '018003' | '018004' | '018'

/**
 * 获取后端辅助数据
 *
 * 001=数字货币分类
 *
 * 019001=中国银行列表
 *
 * 019004=越南银行列表
 *
 * 004=支付方式列表
 *
 * 005=支付类型列表
 *
 * 006=国家列表
 *
 * 007=币种列表
 *
 * 008=账变类型列表
 *
 * 011=国际电话区号
 *
 * 019002=巴西银行列表
 *
 * 019003=印度银行列表
 *
 * 019005=泰国银行列表
 *
 * 018001=USDT协议
 *
 * 018002=BTC协议
 *
 * 018003=ETH协议
 *
 * 018004=BNB协议
 *
 * 018=所有虚拟币协议
 */
export function useApiMemberTreeList(type?: TTreeListType) {
  const { data, loading, error, run, runAsync } = useRequest(ApiMemberTreeList)
  if (type)
    run({ level: type })

  return {
    data,
    loading,
    error,
    run,
    runAsync,
  }
}
