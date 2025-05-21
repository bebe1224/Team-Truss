const totalSalesInput = document.getElementById('totalSales');
const commissionRateInput = document.getElementById('commissionRate');
const finalSettlementInput = document.getElementById('finalSettlement');

function calculateFinalSettlement() {
    const total = parseFloat(totalSalesInput.value) || 0;
    const commission = parseFloat(commissionRateInput.value) || 0;
    const finalAmount = total - (total * (commission / 100));
    finalSettlementInput.value = finalAmount.toFixed(2);
}

totalSalesInput.addEventListener('input', calculateFinalSettlement);
commissionRateInput.addEventListener('input', calculateFinalSettlement);