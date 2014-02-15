
public class IntBubble extends Bubble {
	private int[] nums = null;
	
	public void sort(int[] nums) {
		this.nums = nums;
		this.length = nums.length;
		doSort();
	}

	@Override
	protected void swap(int i) {
		int temp = this.nums[i];
		this.nums[i] = this.nums[i+1];
		this.nums[i+1] = temp;
	}

	@Override
	protected boolean outOfOrder(int i) {
		return (this.nums[i] > this.nums[i+1]);
	}

}
