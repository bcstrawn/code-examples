import static org.junit.Assert.*;

import org.junit.Test;


public class IntBubbleTest {

	@Test
	public void testTwoSortedValues() {
		int[] nums = {2, 3};
		int[] numsSorted = {2, 3};
		Bubble bubble = new Bubble(new IntSort());
		bubble.sort(nums);
 		assertArrayEquals(nums, numsSorted);
	}

	@Test
	public void testTwoUnsortedValues() {
		int[] nums = {3, 1};
		int[] numsSorted = {1, 3};
		Bubble bubble = new Bubble(new IntSort());
		bubble.sort(nums);
 		assertArrayEquals(numsSorted, nums);
	}
	
	@Test
	public void testThreeUnsortedValues() {
		int[] nums = {3, 2, 1};
		int[] numsSorted = {1, 2, 3};
		Bubble bubble = new Bubble(new IntSort());
		bubble.sort(nums);
 		assertArrayEquals(numsSorted, nums);
	}

}
