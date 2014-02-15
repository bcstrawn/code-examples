import static org.junit.Assert.*;

import org.junit.Test;


public class BikeTest {
	BikeBuilder builder = new BikeBuilder();
	
	@Test
	public void unmodifiedMountainBikeHasSpeedOf1() {
		Bike bike = builder.createBike("mountain").build();
		assertEquals(bike.getSpeed(), 1);
	}
	
	@Test
	public void unmodifiedFixedSpeedBikeHasSpeedOf2() {
		Bike bike = builder.createBike("fixed").build();
		assertEquals(bike.getSpeed(), 2);
	}
	
	@Test
	public void unmodifiedRacingBikeHasSpeedOf3() {
		Bike bike = builder.createBike("racing").build();
		assertEquals(bike.getSpeed(), 3);
	}
	
	@Test
	public void fixedSpeedBikeWithSkinnyTireAndRolloverHandlebarHasSpeedOf5() {
		Bike bike = builder.createBike("fixed").tires(new SkinnyTire()).handlebars(new RolloverHandlebar()).build();
		assertEquals(bike.getSpeed(), 5);
	}
	
	@Test
	public void MountainBikeWithWindBreakTireAndBullhornHandlebarHasSpeedOf5() {
		Bike bike = builder.createBike("mountain").tires(new WindBreakTire()).handlebars(new BullhornHandlebar()).build();
		assertEquals(bike.getSpeed(), 5);
	}
	
	@Test
	public void RacingBikeWithFatTireAndStraightHandlebarHasSpeedOf3() {
		Bike bike = builder.createBike("racing").tires(new FatTire()).handlebars(new StraightHandlebar()).build();
		assertEquals(bike.getSpeed(), 3);
	}
}
